import React from "react";
import Selector from "../core/Selector";

const codes = [
  "WF", "JP", "JM", "JO", "WS", "JE", "GW", "GU", "GT", "GS", "GR",
  "GQ", "GP", "GY", "GG", "GF", "GE", "GD", "GB", "GA", "GN", "GM",
  "GL", "GI", "GH", "PR", "PS", "PW", "PT", "PY", "PA", "PF", "PG",
  "PE", "PK", "PH", "PN", "PL", "PM", "ZM", "ZA", "ZZ", "ZW", "ME",
  "MD", "MG", "MF", "MA", "MC", "MM", "ML", "MO", "MN", "MH", "MK",
  "MU", "MT", "MW", "MV", "MQ", "MP", "MS", "MR", "MY", "MX", "MZ",
  "FR", "FI", "FJ", "FK", "FM", "FO", "CK", "CI", "CH", "CO", "CN",
  "CM", "CL", "CC", "CA", "CG", "CF", "CD", "CZ", "CY", "CX", "CR",
  "CW", "CV", "CU", "SZ", "SY", "SX", "SS", "SR", "SV", "ST", "SK",
  "SJ", "SI", "SH", "SO", "SN", "SM", "SL", "SC", "SB", "SA", "SG",
  "SE", "SD", "YE", "YT", "LB", "LC", "LA", "LK", "LI", "LV", "LT",
  "LU", "LR", "LS", "LY", "VA", "VC", "VE", "VG", "IQ", "VI", "IS",
  "IR", "IT", "VN", "IM", "IL", "IO", "IN", "IE", "ID", "BD", "BE",
  "BF", "BG", "BA", "BB", "BL", "BM", "BN", "BO", "BH", "BI", "BJ",
  "BT", "BV", "BW", "BQ", "BR", "BS", "BY", "BZ", "RU", "RW", "RS",
  "RE", "RO", "OM", "HR", "HT", "HU", "HK", "HN", "HM", "EH", "EE",
  "EG", "EC", "ET", "ES", "ER", "UY", "UZ", "US", "UM", "UG", "UA",
  "VU", "NI", "NL", "NO", "NA", "NC", "NE", "NF", "NG", "NZ", "NP",
  "NR", "NU", "XK", "XZ", "XX", "KG", "KE", "KI", "KH", "KN", "KM",
  "KR", "KP", "KW", "KZ", "KY", "DO", "DM", "DJ", "DK", "DE", "DZ",
  "TZ", "TV", "TW", "TT", "TR", "TN", "TO", "TL", "TM", "TJ", "TK",
  "TH", "TF", "TG", "TD", "TC", "AE", "AD", "AG", "AF", "AI", "AM",
  "AL", "AO", "AN", "AQ", "AS", "AR", "AU", "AT", "AW", "AX", "AZ",
  "QA"]

export default CountryCodeSelector = ({ baseValue, setter }) =>
  <Selector {...{ baseValue, setter }} values={codes} type="modal" />