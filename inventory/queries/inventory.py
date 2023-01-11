from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional

# should brands and products be separate folders?

# food brand shiz


class Error(BaseModel):
    message: str


class FoodBrandIn(BaseModel):
    name: str
    animal_type: str


class FoodBrandOut(BaseModel):
    id: int
    name: str
    animal_type: str


class FoodBrandRepository:
    def create(self, food_brand: FoodBrandIn) -> Union[Error,FoodBrandOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO food_brands
                            (name, animal_type)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            food_brand.name,
                            food_brand.animal_type,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.food_brand_in_to_out(id, food_brand)
                    # old_data = food_brand.dict
                    # return FoodBrandOut(id=id, **old_data)
                    # probably change to in_to_out approach later
        except Exception as e:
        #     print(e)
            return {"messsage": "Could not create brand"}

    def get_all_food_brands(self) -> Union[Error, List[FoodBrandOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, animal_type
                        FROM food_brands
                        ORDER BY name;
                        """
                    )
                    return [
                        FoodBrandOut(
                            id=record[0],
                            name=record[1],
                            animal_type=record[2]
                        )
                        for record in db
                    ]
        except Exception as e:
            return {"message": "Could not retrieve all brands"}

    def update(
        self, food_brand_id: int, food_brand: FoodBrandIn
    ) -> Union[FoodBrandOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE food_brands
                        SET name = %s
                        , animal_type = %s
                        WHERE id = %s
                        """,
                        [
                            food_brand.name,
                            food_brand.animal_type,
                            food_brand_id
                        ]
                    )
                    return self.food_brand_in_to_out(food_brand_id, food_brand)

        except Exception as e:
            # print(e)
            return {
                "message": "Could not update that food brand.  Please check your input information, and try again."
            }

    def delete_food_brand(self, food_brand_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM food_brands
                        WHERE id = %s
                        """,
                        [food_brand_id]
                    )
                    return True
        except Exception as e:
            # print(e)
            return False

    def get_one(self, food_brand_id: int) -> Optional[FoodBrandOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , name
                        , animal_type
                        FROM food_brands
                        WHERE id = %s
                        """,
                        [
                            food_brand_id
                        ]
                    )
                    record = result.fetchone()#[0]
                    if record is None:
                        return None
                    return self.record_to_food_brand_out(record)
        except Exception as e:
            print(e)  # only if you want it; for dev purposes
            return {"message": "Could not retrieve that food brand.  Please try again."}

    def food_brand_in_to_out(self, id: int, food_brand: FoodBrandIn):
        old_data = food_brand.dict()
        return FoodBrandOut(id=id, **old_data)

    def record_to_food_brand_out(self, record):
        return FoodBrandOut(
            id=record[0],
            name=record[1],
            animal_type=record[2]
        )


# STOP TYPING FOOB, OR GO TO SLEEPn AND TRY AGAIN TOMORROW

# food product shiz


class FoodProductIn(BaseModel):
    name: str
    price: int
    main_ingredient: str
    brand: int
    state: str
    picture_url: str


class FoodProductOut(BaseModel):
    id: int
    name: str
    price: int
    main_ingredient: str
    brand: FoodBrandOut
    state: str
    picture_url: str


class FoodProductRepository:
    def create(self, food_product: FoodProductIn) -> FoodProductOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO food_products
                            (name
                            , price
                            , main_ingredient
                            , brand_id
                            , state
                            , picture_url)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                    [
                        food_product.name,
                        food_product.price,
                        food_product.main_ingredient,
                        food_product.brand_id,
                        food_product.state,
                        food_product.picture_url,
                    ],
                )
                id = result.fetchone()[0]
                return self.food_product_in_to_out(id, food_product)

    def get_all_food_products(self) -> Union[List[FoodProductOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , name
                        , price
                        , main_ingredient
                        , brand_id
                        , state
                        , picture_url
                        FROM food_products
                        ORDER BY name;
                        """
                    )
                    return [
                        FoodProductOut(
                            id=record[0],
                            name=record[1],
                            price=record[2],
                            main_ingredient=record[3],
                            brand=record[4],
                            state=record[5],
                            picture_url=record[6],
                        )
                        for record in db
                    ]
        except Exception as e:
            # print 'em if you got 'em
            return {
                "message": "Could not retrieve all food products.  Please try your request again"
            }

    def update(
        self, food_product_id: int, food_product: FoodProductIn
    ) -> Union[FoodProductOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE food_products
                        SET name = %s
                        , price = %s
                        , main_ingredient = %s
                        , brand_id = %s
                        , state = %s
                        , picture_url = %s
                        WHERE id = %s
                        """,
                        [
                            food_product.name,
                            food_product.price,
                            food_product.main_ingredient,
                            food_product.brand_id,
                            food_product.state,
                            food_product.picture_url,
                        ],
                    )
                    return self.food_product_in_to_out(food_product_id, food_product)
        except Exception as e:
            # you know the deal, shoud prob print this during testing, tho
            return {"message": "Could not update that product; please try again."}

    def delete(self, food_product_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM food_products
                        WHERE id = %s
                        """,
                        [food_product_id],
                    )
                    return True
        except Exception as e:
            return False

    def get_one_food_product(self, food_product_id: int) -> Optional[FoodProductOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , name
                        , price
                        , main_ingredient
                        , brand_id
                        , state
                        , picture_url
                        FROM food_products
                        WHERE id = %s
                        """,
                        [food_product_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_food_product_out(record)
        except Exception as e:
            return {"message": "Could not locate that product.  Please try again."}

    def food_product_in_to_out(self, id: int, food_product: FoodProductIn):
        old_data = food_product.dict()
        return FoodProductOut(id=id, **old_data)

    def record_to_food_product_out(self, record):
        return FoodProductOut(
            id=record[0],
            name=record[1],
            price=record[2],
            main_ingredient=record[3],
            brand_id=record[4],
            state=record[5],
            picture_url=record[6],
        )
