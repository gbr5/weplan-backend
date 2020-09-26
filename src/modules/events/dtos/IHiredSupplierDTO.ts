import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';

interface IAgreementDTO {
  amount: number;
  number_of_installments: number;
  transactions: Transaction[];
}

export default interface IHiredSupplierDTO {
  id: string;
  // user_id: string;
  name: string;
  // avatar: string;
  // category: string;
  // sub_category: string;
  transactionAgreement: IAgreementDTO[];
}

// export default interface IHiredSupplierDTO {
//   id: string;
//   user_id: string;
//   name: string;
//   avatar: string;
//   category: string;
//   sub_category: string;
//   agreements: [
//     {
//       id: string;
//       amount: number;
//       installments: [
//         {
//           id: string;
//           amount: number;
//           due_date: Date;
//           isPaid: boolean;
//         },
//       ];
//     },
//   ];
// }
