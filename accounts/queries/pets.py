from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class PetIn(BaseModel):
    name: str
    breed: str
    size: str
    age: int
    account_id: int


class PetOut(BaseModel):
    id: int
    name: str
    breed: str
    size: str
    age: int
    account_id: int


class PetRepository:
    def create(self, pet: PetIn) -> PetOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO pets
                        (name, breed, size, age, account_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [pet.name, pet.breed, pet.size, pet.age, pet.account_id],
                )
                id = result.fetchone()[0]
                return self.pet_in_to_out(id, pet)

    def get_all_pets(self) -> Union[List[PetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , name
                        , breed
                        , size
                        , age
                        , account_id
                        FROM pets
                        ORDER BY id;
                        """
                    )
                    return [
                        PetOut(
                            id=record[0],
                            name=record[1],
                            breed=record[2],
                            size=record[3],
                            age=record[4],
                            account_id=record[5],
                        )
                        for record in result
                    ]
        except Exception as e:
            # print(e) print 'em if you want 'em during testing
            return {
                "message": "Could not retrieve all pets.  Please try your request again."
            }

    def update_pet(self, pet_id: int, pet: PetIn) -> Union[PetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE pets
                        SET name = %s
                        , breed = %s
                        , size = %s
                        , age = %s
                        , account_id = %s
                        WHERE id = %s
                        """,
                        [pet.name, pet.breed, pet.size, pet.age, pet.account_id],
                    )
                    return self.pet_in_to_out(pet_id, pet)

        except Exception as e:
            return {"message": "Could not update that pet; please try again."}

    def delete_pet(self, pet_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pets
                        WHERE id = %s
                        """,
                        [pet_id],
                    )
                    return True
        except Exception as e:
            return False

    # SKIP AND CHECK PET_IN_TO_OUT FUNCTION
    # FOR PET DETAIL STRETCH GOAL; NOT PART OF MVP

    # def get_one_pet(self, pet_id: int) -> Optional[PetOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT id
    #                     , name
    #                     , breed
    #                     , size
    #                     , age
    #                     , account_id
    #                     FROM pets
    #                     WHERE id = %s
    #                     """,
    #                     [pet_id]
    #                 )
    #                 record = result.fetchone()
    #                 if record is None:
    #                     return None
    #                 return self.record_to_pet_out(record)
    #     except Exception as e:
    #         return {"message": "Could not locate that pet.  Please try again."}

    def pet_in_to_out(self, id: int, pet: PetIn):
        old_data = pet.dict()
        return PetOut(id=id, **old_data)


# FOR PET DETAIL STRETCH GOAL; NOT PART OF MVP
# def record_to_pet_out(self, record):
#     return PetOut(
#         id=record[0],
#         name=record[1],
#         breed=record[2],
#         size=record[3],
#         age=record[4],
#         account_id=record[5]
#     )
