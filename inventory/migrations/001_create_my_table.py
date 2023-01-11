steps = [
    [
        """
        CREATE TABLE food_brands (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            animal_type VARCHAR(1000) NOT NULL
        );
        """,

        """
        DROP TABLE food_brands;
        """
    ]
]
