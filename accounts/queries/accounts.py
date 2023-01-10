from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional

# accounts shiz
class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    address: str


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str
    address: str


class AccountRepository:
    def create(self, account: AccountIn) -> AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (first_name, last_name, email, password, address)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.password,
                            account.address,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.account_in_to_out(id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not create an account.  Please try again."}

    def get_all_accounts(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, first_name, last_name, email, password, address
                        FROM accounts
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_account_out(record)
                        for record in result
                    ]
        except Exception as e:
            return {"message": "Could not retrieve all accounts.  Please try again."}

    def update_an_account(
        self, account_id: int, account: AccountIn
    ) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET first_name = %s
                          , last_name = %s
                          , email = %s
                          , password = %s
                          , address = %s
                        WHERE id = %s
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.password,
                            account.address,
                            account_id
                        ]
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            # print(e) if you want to print in testing
            return {
                "message": "Could not update that account.  Please check your input information, and try again."
            }

    def delete_account(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id]
                    )
                    return True
        except Exception as e:
            # print(e)
            return False

    def get_one_account(self, account_id: int) -> Optional[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , first_name
                        , last_name
                        , email
                        , password
                        , address
                        FROM accounts
                        WHERE id = %s
                        """,
                        [account_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            return {"message": "Could not locate that account.  Please try again. "}

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            password=record[4],
            address=record[5],
        )


# pet shiz

# add error class if pages broken out in final product


# class PetIn(BaseModel):
#     name: str
#     breed: str
#     size: str
#     age: int
#     account_id: int


# class PetOut(BaseModel):
#     id: int
#     name: str
#     breed: str
#     size: str
#     age: int
#     account_id: int


# class PetRepository:
#     def create(self, pet: PetIn) -> PetOut:
#         with pool.connection() as conn:
#             with conn.cursor() as db:
#                 result = db.execute(
#                     """
#                     INSERT INTO pets
#                         (name, breed, size, age, account_id)
#                     VALUES
#                         (%s, %s, %s, %s, %s)
#                     RETURNING id;
#                     """,
#                     [pet.name, pet.breed, pet.size, pet.age, pet.account_id],
#                 )
#                 id = result.fetchone()[0]
#                 return self.pet_in_to_out(id, pet)

#     def get_all_pets(self) -> Union[List[PetOut], Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         SELECT id
#                         , name
#                         , breed
#                         , size
#                         , age
#                         , account_id
#                         FROM pets
#                         ORDER BY tbd; I'm assuming name?
#                         """
#                     )
#                     return [
#                         PetOut(
#                             id=record[0],
#                             name=record[1],
#                             breed=record[2],
#                             size=record[3],
#                             age=record[4],
#                             account_id=record[5],
#                         )
#                         for record in db
#                     ]
#         except Exception as e:
#             # print(e) print 'em if you want 'em during testing
#             return {
#                 "message": "Could not retrieve all pets.  Please try your request again."
#             }

#     def update_pet(self, pet_id: int, pet: PetIn) -> Union[PetOut, Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         UPDATE pets
#                         SET name = %s
#                         , breed = %s
#                         , size = %s
#                         , age = %s
#                         , account_id = %s
#                         WHERE id = %s
#                         """,
#                         [pet.name, pet.breed, pet.size, pet.age, pet.account_id],
#                     )
#                     return self.pet_in_to_out(pet_id, pet)

#         except Exception as e:
#             return {"message": "Could not update that pet; please try again."}

#     def delete_pet(self, pet_id: int) -> bool:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         DELETE FROM pets
#                         WHERE id = %s
#                         """,
#                         [pet_id],
#                     )
#                     return True
#         except Exception as e:
#             return False

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

    # def pet_in_to_out(self, id: int, pet: PetIn):
    #     old_data = pet.dict
    #     return PetOut(id=id, **old_data)


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
