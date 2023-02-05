steps = [
    [
        """
        INSERT INTO food_brands (
            name
            , animal_type) VALUES
        ('Pedigree', 'Dog'),
        ('Blue Buffalo', 'Dog'),
        ('Purina', 'Dog'),
        ('American Journey', 'Dog'),
        ('Friskies', 'Cat'),
        ('Cat Chow', 'Cat'),
        ('Hill Science Diet', 'Cat');
        """,
        """
        DROP TABLE food_brands;
        """
    ]
]
