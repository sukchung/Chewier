from fastapi.testclient import TestClient
from main import app
from queries.inventory import (
    FoodProductRepository,
    FoodProductOut,
    FoodProductIn,
)

client = TestClient(app)


class FakeFoodProductRepository:
    def create(self, product):
        return FoodProductOut(
            id=1,
            name=product.name,
            price=product.price,
            main_ingredient=product.main_ingredient,
            brand_id=product.brand_id,
            state=product.state,
            picture_url=product.picture_url,
        )


def test_create_product():
    product_in = FoodProductIn(
        name="chewier",
        price="1000",
        main_ingredient="blue",
        brand_id=1,
        state="dry",
        picture_url="None",
    )
    expected_product = FoodProductOut(
        id=1,
        name="chewier",
        price="1000",
        main_ingredient="blue",
        brand_id=1,
        state="dry",
        picture_url="None",
    )
    app.dependency_overrides[FoodProductRepository] = FakeFoodProductRepository

    response = client.post("/products", json=product_in.dict())

    assert response.status_code == 200
    assert response.json() == expected_product.dict()
