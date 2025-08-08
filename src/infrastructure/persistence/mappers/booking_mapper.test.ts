import { Booking } from '../../../domain/entities/booking';
import { DateRange } from '../../../domain/value_objects/date_range';
import { BookingEntity } from '../entities/booking_entity';
import { PropertyEntity } from '../entities/property_entity';
import { UserEntity } from '../entities/user_entity';
import { BookingMapper } from './booking_mapper';
import { PropertyMapper } from './property_mapper';
import { UserMapper } from './user_mapper';

describe("Booking Mapper", () => {

    let property: PropertyEntity;
    let user: UserEntity;
    let dateRange: DateRange;
    let entity: BookingEntity;

    beforeEach(() => {
        property = new PropertyEntity();
        property.id = "1";
        property.name = "propriedade 1";
        property.description = "casa de inverno";
        property.maxGuests = 4;
        property.basePricePerNight = 200;

        user = new UserEntity();
        user.id = "1";
        user.name = "João Silva";

        dateRange = new DateRange(
            new Date("2025-08-10"),
            new Date("2025-08-15")
        );
    
        entity = new BookingEntity();
        entity.id = "1";
        entity.property = property;
        entity.guest = user;
        entity.startDate = dateRange.getStartDate();
        entity.endDate = dateRange.getEndDate();
        entity.guestCount = 4;
        entity.totalPrice = 1000;
        entity.status = "CONFIRMED";
    });
    
    it("deve converter BookingEntity em Booking corretamente", () => {
        // Arrange
        
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
        expect(booking.getGuestCount()).toBe(4);
        expect(booking.getTotalPrice()).toBe(1000);
        expect(booking.getStatus()).toBe("CONFIRMED");
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        // Arrange
        entity.guestCount = 0;

        // Act & Assert
        expect(() => {
            const p1 = PropertyMapper.toDomain(property);
            const u1 = UserMapper.toDomain(user);
            const booking = BookingMapper.toDomain(entity);
            p1.addBooking(booking);
        }).toThrow("O número de hóspedes deve ser maior que zero");

        // Arrange
        entity.guestCount = 5;

        // Act & Assert
        expect(() => {
            const p1 = PropertyMapper.toDomain(property);
            const u1 = UserMapper.toDomain(user);
            const booking = BookingMapper.toDomain(entity);
            p1.addBooking(booking);
        }).toThrow("Número máximo de hóspedes excedido. Máximo permitido: 4.");

        // Arrange
        entity.guestCount = 4;
        const dateRange2 = new DateRange(
            new Date("2025-08-11"),
            new Date("2025-08-14")
        );
        const p1 = PropertyMapper.toDomain(property);
        const u1 = UserMapper.toDomain(user);
        const booking = BookingMapper.toDomain(entity);
        p1.addBooking(booking);        

        // Act & Assert
        expect(() => {
            const booking2 = new Booking("2", p1, u1, dateRange2, 4);
        }).toThrow("A propriedade não está disponível para o período selecionado.");
    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        // Arrange
        const p1 = PropertyMapper.toDomain(property);
        const u1 = UserMapper.toDomain(user);
        const booking = new Booking("1", p1, u1, dateRange, 4);

        // Act
        const bookingEntity = BookingMapper.toPersistence(booking);

        // Assert
        expect(bookingEntity.id).toBe("1");
        expect(bookingEntity.property).toStrictEqual(property);
        expect(bookingEntity.guest).toStrictEqual(user);
        expect(bookingEntity.startDate).toBe(dateRange.getStartDate());
        expect(bookingEntity.endDate).toBe(dateRange.getEndDate());
        expect(bookingEntity.guestCount).toBe(4);
        expect(bookingEntity.totalPrice).toBe(1000);
        expect(bookingEntity.status).toBe("CONFIRMED");
    });

});
