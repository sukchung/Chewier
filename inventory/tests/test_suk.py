from fastapi.testclient import TestClient
from main import app
from queries.inventory import (
    FoodBrandRepository,
    FoodBrandOut,
    FoodBrandIn,
)


client = TestClient(app)


class FakeFoodBrandRepository:
    def create(self, food_brand):
        return FoodBrandOut(
            id=1,
            name=food_brand.name,
            animal_type=food_brand.animal_type,
        )


def test_create_food_brand():
    food_brand_in = FoodBrandIn(name="Blue Buffalo", animal_type="Dog")

    expected_food_brand = FoodBrandOut(
        id=1, name="Blue Buffalo", animal_type="Dog"
    )

    app.dependency_overrides[FoodBrandRepository] = FakeFoodBrandRepository
    response = client.post("/brands", json=food_brand_in.dict())
    assert response.status_code == 200
    assert response.json() == expected_food_brand.dict()
