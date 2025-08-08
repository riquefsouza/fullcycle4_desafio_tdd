import { Property } from '../../../domain/entities/property';
import { PropertyEntity } from '../entities/property_entity';
import { PropertyMapper } from './property_mapper';


describe("Property Mapper", () => {

    it("deve converter PropertyEntity em Property corretamente", () => {
        // Arrange
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "propriedade 1";
        entity.description = "casa de inverno";
        entity.maxGuests = 4;
        entity.basePricePerNight = 200;

        // Act
        const property = PropertyMapper.toDomain(entity)

        // Assert
        expect(property.getId()).toBe("1");
        expect(property.getName()).toBe("propriedade 1");
        expect(property.getDescription()).toBe("casa de inverno");
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
        // Arrange
        const entity = new PropertyEntity();
        entity.id = "1";
        entity.name = "";
        entity.description = "casa de inverno";
        entity.maxGuests = 4;
        entity.basePricePerNight = 200;

        // Act & Assert
        expect(() => { 
            PropertyMapper.toDomain(entity)
        }).toThrow("O nome é obrigatório");
        
        // Arrange
        entity.name = "propriedade 1";
        entity.maxGuests = 0;

        // Act & Assert
        expect(() => {
            PropertyMapper.toDomain(entity)
        }).toThrow("O número máximo de hóspedes deve ser maior que zero");

    });

    it("deve converter Property para PropertyEntity corretamente", () => {
        // Arrange
        const property = new Property(
            "1",
            "Casa de praia",
            "Uma bela casa na praia",
            4,
            200
        );

        // Act
        const propertyEntity = PropertyMapper.toPersistence(property);

        // Assert
        expect(propertyEntity.id).toBe("1");
        expect(propertyEntity.name).toBe("Casa de praia");
        expect(propertyEntity.description).toBe("Uma bela casa na praia");
        expect(propertyEntity.maxGuests).toBe(4);
        expect(propertyEntity.basePricePerNight).toBe(200);
    });

});
