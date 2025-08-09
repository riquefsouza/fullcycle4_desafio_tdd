import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund copy";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {

    it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", async () => {
        // Arrange
        const timeDiff = 8;
        const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Act
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        
        // Assert
        expect(refundRule).toEqual(new FullRefund());
    });

    it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", async () => {
        // Arrange
        const timeDiff = 5;
        const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Act
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        
        // Assert
        expect(refundRule).toEqual(new PartialRefund());
    });

    it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", async () => {
        // Arrange
        const timeDiff = 0;
        const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Act
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        
        // Assert
        expect(refundRule).toEqual(new NoRefund());
    });

});