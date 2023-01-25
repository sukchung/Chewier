from fastapi.testclient import TestClient
from main import app
from queries.inventory import FoodBrandOut, FoodBrandRepository


food_brand_out = FoodBrandOut(
            id=17,
            name="test",
            animal_type="cat"
    )

client = TestClient(app)


class FakeBrandRepository:
    def get_one(self, id):
        return food_brand_out


def test_get_brand():
    app.dependency_overrides[FoodBrandRepository] = FakeBrandRepository
    response = client.get("/brands/17")
    assert response.status_code == 200
    assert response.json() == food_brand_out
