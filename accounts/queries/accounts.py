from pydantic import BaseModel
from queries.pool import pool
from typing import List

# accounts shiz
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


class AccountRepository:
    def get_all(self) -> List[AccountOutWithPassword]:
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
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_account_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {
                "message": "Could not retrieve all accounts. Please try again."
            }

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts(
                            first_name
                            , last_name
                            , email
                            , address
                            , hashed_password
                        )
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.address,
                            hashed_password,
                        ],
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
            return {
                "message": "Could not create an account.  Please try again."
            }

    def get(self, email: str) -> AccountOutWithPassword:
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
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {
                "message": "Could not locate that account.  Please try again. "
            }

    def delete_account(self, account_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pets
                        WHERE account_id = %s
                        """,
                        [account_id],
                    )
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out(self, record):
        return AccountOutWithPassword(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            address=record[4],
            hashed_password=record[5],
        )
