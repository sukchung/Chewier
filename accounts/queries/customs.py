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
                    )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
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
                    ],
                )
                id = result.fetchone()[0]
                return self.custom_in_to_out(id, custom)

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




    def custom_in_to_out(self, id: int, custom: CustomIn):
            old_data = custom.dict()
            return CustomOut(id=id, **old_data)

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
        )
