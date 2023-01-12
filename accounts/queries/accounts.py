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
    address: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass



# def create(self, info: AccountIn, hashed_password: str, roles=["patron"]) -> Account:
#         props = info.dict()
#         props["password"] = hashed_password
#         props["roles"] = roles
#         try:
#             self.collection.insert_one(props)
#         except DuplicateKeyError:
#             raise DuplicateAccountError()
#         props["id"] = str(props["_id"])
#         return Account(**props)



class AccountRepository:
    def create(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (first_name, last_name, email, address, hashed_password)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.address,
                            hashed_password
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = account.dict()
                    return AccountOutWithPassword(
                        id=id,
                        **old_data,
                        hashed_password=hashed_password,
                    )
                    # return self.account_in_to_out(id, account)
        except Exception as e:
            print(e)
            return {"message": "Could not create an account.  Please try again."}

    def get_one_account(self, email: str) -> Optional[AccountOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , first_name
                        , last_name
                        , email
                        , address
                        , hashed_password
                        FROM accounts
                        WHERE email = %s;
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return AccountOutWithPassword(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        address=record[4],
                        hashed_password=record[5],
                    )
        except Exception as e:
            return {"message": "Could not locate that account.  Please try again. "}

    # def get_all_accounts(self) -> Union[Error, List[AccountOut]]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT id, first_name, last_name, email, password, address
    #                     FROM accounts
    #                     ORDER BY id;
    #                     """
    #                 )
    #                 return [
    #                     self.record_to_account_out(record)
    #                     for record in result
    #                 ]
    #     except Exception as e:
    #         return {"message": "Could not retrieve all accounts.  Please try again."}

    # def update_an_account(
    #     self, account_id: int, account: AccountIn
    # ) -> Union[AccountOut, Error]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     UPDATE accounts
    #                     SET first_name = %s
    #                       , last_name = %s
    #                       , email = %s
    #                       , password = %s
    #                       , address = %s
    #                     WHERE id = %s
    #                     """,
    #                     [
    #                         account.first_name,
    #                         account.last_name,
    #                         account.email,
    #                         account.password,
    #                         account.address,
    #                         account_id
    #                     ]
    #                 )
    #                 return self.account_in_to_out(account_id, account)
    #     except Exception as e:
    #         # print(e) if you want to print in testing
    #         return {
    #             "message": "Could not update that account.  Please check your input information, and try again."
    #         }

    # def delete_account(self, account_id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db.execute(
    #                     """
    #                     DELETE FROM accounts
    #                     WHERE id = %s
    #                     """,
    #                     [account_id]
    #                 )
    #                 return True
    #     except Exception as e:
    #         # print(e)
    #         return False

    # def account_in_to_out(self, id: int, account: AccountIn):
    #     old_data = account.dict()
    #     return AccountOut(id=id, **old_data)

    # def record_to_account_out(self, record):
    #     return AccountOut(
    #         id=record[0],
    #         first_name=record[1],
    #         last_name=record[2],
    #         email=record[3],
    #         password=record[4],
    #         address=record[5],
    #     )
