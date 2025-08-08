import { Booking } from '../../../domain/entities/booking';
import { DateRange } from '../../../domain/value_objects/date_range';
import { BookingEntity } from '../entities/booking_entity';
import { PropertyEntity } from '../entities/property_entity';
import { UserEntity } from '../entities/user_entity';
import { BookingMapper } from './booking_mapper';
import { PropertyMapper } from './property_mapper';
import { UserMapper } from './user_mapper';

describe("Booking Mapper", () => {

    it("deve converter BookingEntity em Booking corretamente", () => {
        // Arrange
        const property = new PropertyEntity();
        property.id = "1";
        property.name = "propriedade 1";
        property.description = "casa de inverno";
        property.maxGuests = 2;
        property.basePricePerNight = 200;

        const user = new UserEntity();
        user.id = "1";
        user.name = "João Silva";

        const dateRange = new DateRange(
            new Date("2025-08-10"),
            new Date("2025-08-15")
        );
    
        const entity = new BookingEntity();
        entity.id = "1";
        entity.property = property;
        entity.guest = user;
        entity.startDate = dateRange.getStartDate();
        entity.endDate = dateRange.getEndDate();
        entity.guestCount = 2;
        entity.totalPrice = 1000;
        entity.status = "CONFIRMED";
        
        // Act
        const p1 = PropertyMapper.toDomain(property);
        const u1 = UserMapper.toDomain(user);
        const booking = BookingMapper.toDomain(entity);
        p1.addBooking(booking);

        // Assert
        expect(booking.getId()).toBe("1");
        expect(booking.getProperty()).toStrictEqual(p1);
        expect(booking.getUser()).toStrictEqual(u1);
        expect(booking.getDateRange()).toStrictEqual(dateRange);
        expect(booking.getGuestCount()).toBe(2);
        expect(booking.getTotalPrice()).toBe(1000);
        expect(booking.getStatus()).toBe("CONFIRMED");
    });
/*
    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        // Arrange
        const entity = new BookingEntity();
        entity.id = "1";
        entity.name = "";
        entity.description = "casa de inverno";
        entity.maxGuests = 4;
        entity.basePricePerNight = 200;

        // Act & Assert
        expect(() => { 
            BookingMapper.toDomain(entity)
        }).toThrow("O nome é obrigatório");
        
        // Arrange
        entity.name = "propriedade 1";
        entity.maxGuests = 0;

        // Act & Assert
        expect(() => {
            BookingMapper.toDomain(entity)
        }).toThrow("O número máximo de hóspedes deve ser maior que zero");

    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        // Arrange
        const Booking = new Booking(
            "1",
            "Casa de praia",
            "Uma bela casa na praia",
            4,
            200
        );

        // Act
        const BookingEntity = BookingMapper.toPersistence(Booking);

        // Assert
        expect(BookingEntity.id).toBe("1");
        expect(BookingEntity.name).toBe("Casa de praia");
        expect(BookingEntity.description).toBe("Uma bela casa na praia");
        expect(BookingEntity.maxGuests).toBe(4);
        expect(BookingEntity.basePricePerNight).toBe(200);
    });
*/
});
