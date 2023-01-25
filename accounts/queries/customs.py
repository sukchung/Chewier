from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional

class Error(BaseModel):
    message: str

class CustomIn(BaseModel):
    goal: str
    breed: str
    age: int
    allergies: str
    activity: str
    protein: str
    state: str
    account_id: int
    name: str

class CustomOut(BaseModel):
    id: int
    goal: str
    breed: str
    age: int
    allergies: str
    activity: str
    protein: str
    state: str
    account_id: int
    price: float
    name: str


class CustomRepository:
    def create(self, custom: CustomIn) -> CustomOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO customs(
                        goal
                        , breed
                        , age
                        , allergies
                        , activity
                        , protein
                        , state
                        , account_id
                        , name
                    )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        custom.goal,
                        custom.breed,
                        custom.age,
                        custom.allergies,
                        custom.activity,
                        custom.protein,
                        custom.state,
                        custom.account_id,
                        custom.name,
                    ],
                )
                id = result.fetchone()[0]
                price = 70.99
                return self.custom_in_to_out(id, price, custom)

    def get_all(self) -> Union[List[CustomOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , goal
                            , breed
                            , age
                            , allergies
                            , activity
                            , protein
                            , state
                            , account_id
                            , price
                            , name
                        FROM customs
                        ORDER BY id;
                        """
                    )
                    return [
                        CustomOut(
                            id=record[0],
                            goal=record[1],
                            breed=record[2],
                            age=record[3],
                            allergies=record[4],
                            activity=record[5],
                            protein=record[6],
                            state=record[7],
                            account_id=record[8],
                            price=record[9],
                            name=record[10]
                        )
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {
                "message": """
                            Could not retrieve all custom forms.
                             Please try your request again.
                            """
            }

    def get_one(self, custom_id: int) -> Optional[CustomOut]:
        try:
            # connect to database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , goal
                            , breed
                            , age
                            , allergies
                            , activity
                            , protein
                            , state
                            , account_id
                            , price
                            , name
                        FROM customs
                        WHERE id = %s
                        """,
                        [custom_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_custom_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that custom"}



    def custom_in_to_out(self, id: int, price: float, custom: CustomIn):
            old_data = custom.dict()
            return CustomOut(id=id, **old_data, price=price)

    def record_to_custom_out(self, record):
        return CustomOut(
            id=record[0],
            goal=record[1],
            breed=record[2],
            age=record[3],
            allergies=record[4],
            activity=record[5],
            protein=record[6],
            state=record[7],
            account_id=record[8],
            price=record[9],
            name=record[10],
        )
