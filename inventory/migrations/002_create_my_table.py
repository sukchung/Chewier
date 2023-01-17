steps = [
    [
    """
    CREATE TABLE food_products (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(1000) NOT NULL,
        price INT NOT NULL,
        main_ingredient VARCHAR(1000) NOT NULL,
        brand_id INT NOT NULL REFERENCES food_brands(id),
        state VARCHAR(1000) NOT NULL,
        picture_url VARCHAR(1000) NOT NULL
    );
    """,
    """
    DROP TABLE food_products;
    """
    ]
]
