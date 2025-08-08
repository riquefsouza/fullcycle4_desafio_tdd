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

    //it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity") 
    
    //it("deve converter Property para PropertyEntity corretamente") 
    
    


});
