import "reflect-metadata";
import { CreditCardService } from "../../src/services/CreditCardService";
import { getDefaultCreditCards, createEmptyCreditCard, newCardWithName, newCardWithNumber } from "../utils/creditCardTestBuilder";
import {NotFound, Conflict, BadRequest} from "../../src/utils/exceptions";

describe("CreditCardService", () => {

  let creditCardService: CreditCardService;

  beforeAll( done => {
    // we could mock other components/classes here which were used in creditCardService, i.e dbService or some data store
    // but in this case we dont need to mock anything because we are not using any other db service or data store or any other external component

    creditCardService = new CreditCardService();

    done();
  });

  describe("addCreditCard", () => {
    it("should throw bad requests for required fields",  () => {
      const addCreditCard = () => {
        creditCardService.addCreditCard(createEmptyCreditCard());
      };
      expect(addCreditCard).toThrowError(BadRequest);
    });

    it("should throw bad requests for missing cardNumber and limit",  () => {
      const addCreditCard = () => {
        creditCardService.addCreditCard(newCardWithName("Muhammad Rizwan"));
      };
      expect(addCreditCard).toThrowError(BadRequest);
    });

    it("should throw bad requests for missing name and limit",  () => {
      const addCreditCard = () => {
        creditCardService.addCreditCard(newCardWithNumber(4111111111111111));
      };
      expect(addCreditCard).toThrowError(BadRequest);
    });

    it("should throw bad requests for invalid credit card",  () => {
      const addCreditCard = () => {
        creditCardService.addCreditCard(newCardWithNumber(411111111111111));
      };
      expect(addCreditCard).toThrowError(BadRequest);
    });

    it("should add credit card",  () => {
      const card = getDefaultCreditCards(1)[0];
      const creditCard = creditCardService.addCreditCard(card);
      expect(creditCard).toEqual(card);
    });

    it("should throw bad requests for existing credit card number",  () => {
      const card = getDefaultCreditCards(1)[0];
      const addCreditCard = () => {
        creditCardService.addCreditCard(card);
      };
      expect(addCreditCard).toThrowError(Conflict);
    });

    it("should add credit card with balance 0",  () => {
      const card = getDefaultCreditCards(2)[1];
      const creditCard = creditCardService.addCreditCard(card);
      expect(creditCard.balance).toEqual(0);
    });
  });

  describe("getCreditCards", () => {
    it("should return empty array",  () => {
      const creditCards = creditCardService.getCreditCards();
      expect(creditCards).toHaveLength(2);
    });
  });

  describe("getCreditCard", () => {
    it("should throw bad request error",  () => {
      const getCreditCard = () => {
        creditCardService.getCreditCard(null);
      };
      expect(getCreditCard).toThrowError(BadRequest);
    });

    it("should throw not found error",  () => {
      const getCreditCard = () => {
        creditCardService.getCreditCard("someid");
      };
      expect(getCreditCard).toThrowError(NotFound);
    });

    it("should return card against given id",  () => {
      const card = getDefaultCreditCards(3)[2];
      creditCardService.addCreditCard(card);
      const creditCard = creditCardService.getCreditCard(card.id);
      expect(creditCard).toEqual(card);
    });
  });
});
