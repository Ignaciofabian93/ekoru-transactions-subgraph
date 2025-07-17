export type AccountType = "FREE" | "PLUS" | "PREMIUM";
export type TransactionKind = "PURCHASE" | "EXCHANGE" | "GIFT" | "REFERRAL" | "BONUS";
export type ExchangeStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "COMPLETED" | "CANCELLED";
export type ShippingStage = "PREPARING" | "SHIPPED" | "DELIVERED" | "RETURNED" | "CANCELED";
export type Badge =
  | "POPULAR"
  | "DISCOUNTED"
  | "WOMAN_OWNED"
  | "ECO_FRIENDLY"
  | "BEST_SELLER"
  | "TOP_RATED"
  | "COMMUNITY_FAVORITE"
  | "LIMITED_TIME_OFFER"
  | "FLASH_SALE"
  | "BEST_VALUE"
  | "HANDMADE"
  | "SUSTAINABLE"
  | "SUPPORTS_CAUSE"
  | "FAMILY_BUSINESS"
  | "CHARITY_SUPPORT"
  | "LIMITED_STOCK"
  | "SEASONAL"
  | "FREE_SHIPPING"
  | "NEW"
  | "USED"
  | "SLIGHT_DAMAGE"
  | "WORN"
  | "FOR_REPAIR"
  | "REFURBISHED"
  | "EXCHANGEABLE"
  | "LAST_PRICE"
  | "FOR_GIFT"
  | "OPEN_TO_OFFERS"
  | "OPEN_BOX"
  | "CRUELTY_FREE"
  | "DELIVERED_TO_HOME"
  | "IN_HOUSE_PICKUP"
  | "IN_MID_POINT_PICKUP";
export type ContactMethod = "EMAIL" | "WHATSAPP" | "ALL";
export type WeightUnit = "KG" | "LB" | "OZ" | "G";
export type ProductSize = "XS" | "S" | "M" | "L" | "XL";
