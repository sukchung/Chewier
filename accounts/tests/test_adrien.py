from fastapi.testclient import TestClient
from main import app
from queries.pets import PetRepository, PetOut

client = TestClient(app)

expected_post_resp = PetOut(
    id=1,
    name="Hachi",
    breed="Pug",
    size="Medium",
    age=5,
    account_id=1,
)

class TestMockPetQueries:
    def get_all_pets(self):
        return [expected_post_resp]


def test_get_all_pets():
    app.dependency_overrides[PetRepository] = TestMockPetQueries

    resp = client.get("/pets")

    assert resp.status_code == 200
    assert resp.json() == [expected_post_resp.dict()]
