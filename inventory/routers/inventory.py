from fastapi import APIRouter, Depends, Response
from queries.inventory import FoodBrandIn, FoodBrandOut, FoodBrandRepository, Error, FoodProductIn, FoodProductOut, FoodProductRepository
from typing import Union, List, Optional


router = APIRouter()


# BRANDS
@router.post("/brands", response_model=Union[FoodBrandOut, Error])
def create_food_brand(
    food_brand: FoodBrandIn,
    response: Response,
    repo: FoodBrandRepository = Depends(),
):
    response.status_code = 400
    return repo.create(food_brand)


@router.get("/brands", response_model=Union[List[FoodBrandOut], Error])
def get_all_food_brands(
    repo: FoodBrandRepository = Depends(),
):
    return repo.get_all_food_brands()


@router.put("/brands/{food_brand_id}", response_model=Union[FoodBrandOut, Error])
def update_food_brand(
    food_brand_id: int,
    food_brand: FoodBrandIn,
    repo: FoodBrandRepository = Depends(),
) -> Union[FoodBrandOut, Error]:
    return repo.update(food_brand_id, food_brand)


@router.delete("/brands/{food_brand_id}", response_model=Union[FoodBrandOut, Error])
def delete_food_brand(
    food_brand_id: int,
    repo: FoodBrandRepository = Depends(),
) -> bool:
    return repo.delete(food_brand_id)


@router.get("/brands/{food_brand_id}", response_model=Union[FoodBrandOut, Error])
def get_one_food_brand(
    food_brand_id: int,
    response: Response,
    repo: FoodBrandRepository = Depends(),
) -> FoodBrandOut:
    food_brand = repo.get_one(food_brand_id)
    if food_brand is None:
        response.status_code= 404
    return food_brand


# PRODUCTS
@router.post("/products", response_model=Union[FoodProductOut, Error])
def create_food_product(
    food_product: FoodProductIn,
    response: Response,
    repo: FoodProductRepository = Depends(),
):
    response.status_code = 400
    return repo.create(food_product)


@router.get("/products", response_model = Union[List[FoodProductOut], Error])
def get_all_food_products(
    repo: FoodProductRepository = Depends(),
):
    return repo.get_all_food_products()


@router.put("/products/{food_product_id}", response_model = Union[FoodProductOut, Error])
def update_food_product(
    food_product_id: int,
    food_product: FoodProductIn,
    repo: FoodProductRepository = Depends(),
) -> Union[FoodProductOut, Error]:
    return repo.update(food_product_id, food_product)


@router.delete("/products/{food_product_id}", response_model=Union[FoodProductOut, Error])
def delete_food_product(
    food_product_id: int,
    repo: FoodProductRepository = Depends(),
) -> bool:
    return repo.delete(food_product_id)


@router.get("/products/{food_product_id}", response_model=Optional[FoodProductOut])
def get_one_food_product(
    food_product_id: int,
    response: Response,
    repo: FoodProductRepository = Depends(),
) -> FoodProductOut:
    food_product = repo.get_one(food_product_id)
    if food_product is None:
        response.status_code = 404
    return food_product
