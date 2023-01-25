from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository, AccountOut, AccountIn

client = TestClient(app)


class FakeAccountRepository:
    def create(self, account):
        return AccountOut(
            id=1,
            first_name=account.first_name,
            last_name=account.last_name,
            email=account.email,
            address=account.address,
        )
