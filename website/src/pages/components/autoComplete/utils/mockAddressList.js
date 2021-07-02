import { nanoid } from "nanoid";

export const mockAddressList = [
  {
    id: "AuPaf829998009",
    RecordId: "AuPaf829998009",
    AddressLine: "Sydney Adventist College, 159 Albert Rd",
    Locality: "STRATHFIELD",
    State: "NSW",
    Postcode: "2135",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf321538290",
    RecordId: "AuPaf321538290",
    AddressLine: "Sydney Adventist Hospital, 185 Fox Valley Rd",
    Locality: "WAHROONGA",
    State: "NSW",
    Postcode: "2076",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf867157530",
    RecordId: "AuPaf867157530",
    AddressLine: "Sydney Boys High School, 556 Cleveland St",
    Locality: "SURRY HILLS",
    State: "NSW",
    Postcode: "2010",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf861869016",
    RecordId: "AuPaf861869016",
    AddressLine: "Sydney Childrens Hospital East, 61 High St",
    Locality: "RANDWICK",
    State: "NSW",
    Postcode: "2031",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf537411279",
    RecordId: "AuPaf537411279",
    AddressLine: "Sydney Customs House, 31 Alfred St",
    Locality: "SYDNEY",
    State: "NSW",
    Postcode: "2000",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf447807920",
    RecordId: "AuPaf447807920",
    AddressLine: "Sydney Customs House, Level 1 31 Alfred St",
    Locality: "SYDNEY",
    State: "NSW",
    Postcode: "2000",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf840745562",
    RecordId: "AuPaf840745562",
    AddressLine: "Sydney Customs House, Level 2 31 Alfred St",
    Locality: "SYDNEY",
    State: "NSW",
    Postcode: "2000",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf565395513",
    RecordId: "AuPaf565395513",
    AddressLine: "Sydney Customs House, Level 3 31 Alfred St",
    Locality: "SYDNEY",
    State: "NSW",
    Postcode: "2000",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf454644719",
    RecordId: "AuPaf454644719",
    AddressLine: "Sydney Customs House, Level 4 31 Alfred St",
    Locality: "SYDNEY",
    State: "NSW",
    Postcode: "2000",
    Country: "Australia",
    CountryCode: "AU",
  },
  {
    id: "AuPaf426426625",
    RecordId: "AuPaf426426625",
    AddressLine: "Sydney Customs House, Level 5 31 Alfred St",
    Locality: "SYDNEY",
    State: "NSW",
    Postcode: "2000",
    Country: "Australia",
    CountryCode: "AU",
  },
];

export const delay = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const itemToString = (value) =>
  value
    ? `${value.AddressLine}, ${value.Locality}, ${value.State}, ${value.Country}`
    : "";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export const typeAhead = (q) => {
  if (!q) return [];

  const query = String(q).trim().replace(" ...", "");
  const [start, remaining] = alphabet.split(query);

  if (!remaining) return [];

  const splitted = remaining ? `${remaining.slice(0, 3)} ...` : "...";
  const data = [`${start}${query}${splitted}`, "Some", "Random", "Text"].map(
    (d) => ({
      text: d,
      id: nanoid(),
    })
  );

  return data;
};
