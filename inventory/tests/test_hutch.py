from fastapi.testclient import TestClient
from main import app
from queries.inventory import FoodProductOut, FoodProductRepository


client = TestClient(app)

food_product_out = FoodProductOut(
            id=1,
            name="Billy",
            price=45.00,
            main_ingredient="chicken",
            brand_id=1,
            state="soft",
            picture_url="test_url.com"
        )


class TestFoodProductRepository:
    def get_all_food_products(self):
        return [food_product_out]


def test_get_all_food_products():
    app.dependency_overrides[FoodProductRepository] = TestFoodProductRepository
    response = client.get("/products")

    assert response.status_code == 200
    assert response.json() == [food_product_out.dict()]
