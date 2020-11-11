import React, { FC } from 'react';
import { Table, TableColumn, Progress } from '@backstage/core';
import Alert from '@material-ui/lab/Alert';

type InformationTableProps = {
  data?: any[], 
  loading: Boolean, 
  error?: string, 
  columns: TableColumn[], 
  title: string
}

type DenseTableProps = {
  data : any[],
  columns: TableColumn[],
  title: string
};

export const DenseTable: FC<DenseTableProps> = ({ data, columns, title }) => {
  return (
    <Table
      title={title}
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

const InformationTable: FC<InformationTableProps> = ({data, loading, error, columns, title}) => {
  console.log({LOADING: loading})
  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{`There was an error retreiving data!`}</Alert>;
  }

  return <DenseTable data={data || [ {} ]} columns={columns} title={title} />;
};

export default InformationTable;
