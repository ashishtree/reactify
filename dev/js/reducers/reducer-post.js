/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function() {
  return [
    {
      company_1: [
        {
          id: 1,
          documentType: "z1",
          comment: "Validation ok, Invoice Transferred to SAP"
        },
        {
          id: 2,
          documentType: "zg",
          comment: "Validation ok, COGS Transferred to SAP"
        },
        {
          id: 3,
          documentType: "zy",
          comment: "Validation ok, ZY Transferred to SAP"
        }
      ]
    },
    {
      company_2: [
        {
          id: 1,
          documentType: "z2",
          comment: "Validation ok, Invoice2 Transferred to SAP"
        },
        {
          id: 2,
          documentType: "zg2",
          comment: "Validation ok, COGS2 Transferred to SAP"
        },
        {
          id: 3,
          documentType: "zy2",
          comment: "Validation ok, ZY2 Transferred to SAP"
        }
      ]
    }
  ];
}
