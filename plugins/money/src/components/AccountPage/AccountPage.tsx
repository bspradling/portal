import React, { FC, useCallback, useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Avatar, Box, Button, Grid, Link } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  TableColumn
} from '@backstage/core';
import InformationTable from '../InformationTable';
import { SpradlingRestApi, MoneyAccount } from '../../api';

// const onSuccess = (token, metadata) => {
//   console.log(token)
// };

const AccountPage: FC<{}> = () => {

  const api = new SpradlingRestApi();

  const haha: number = 1;
  const [accounts, setAccounts] = useState<MoneyAccount[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    api.getMoneyAccounts().then((accounts) => {
      setAccounts(accounts);
    }).catch((error) => {
      console.log(`An error occurred while retreiving money accounts! ${error}`)
      setError(error.message)
    }).finally(() => {
        setLoading(false)
      });
  }, [haha]);

  function getHumanReadableDate(timestamp: string) {
    const date = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options)
  }

  const onSuccess = useCallback((token, metadata) => {
    console.log(token)
    console.log(metadata)
    //TODO: fill this in 
    //api.createMoneyAccount()
  }, []);

  const config = {
    token: 'link-sandbox-3f6f697e-e320-4b7d-8a59-3a0f68e1c0de',
    onSuccess,
  };

  const { open } = usePlaidLink(config);

  const columns: TableColumn[] = [
    { 
      title: '', 
      field: 'picture.medium', 
      render: (entity: any) => (<Avatar src={`data:image/jpeg;base64, ${entity.logo}`}></Avatar>)},
    { 
      title: 'Bank', 
      field: 'bank', 
      render: (entity: any) => (
        <Box fontWeight='fontWeightBold'>
          <Link href={entity.url} color="primary">{entity.bank}</Link> 
        </Box>
      )
    },
    { 
      title: 'Added On', 
      render: (entity: any) => (getHumanReadableDate(entity.addedOn)  )
    },
  ];

  console.log({RESULTS: accounts});

  return (
    <Page themeId="tool">
      <Header title="Account Management" subtitle="Manage your various money accounts"/>
      <Content>
        <ContentHeader title="">
          <Button
            onClick={ () => { console.log("clicked"); open() } }
            variant="contained"
            color="primary"
          >
            Add Account
          </Button>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InformationTable data={accounts} loading={loading} error={error} columns={columns} title='Money Accounts'/>
          </Grid>
        </Grid>
      </Content>
    </Page>
  )
};
  
export default AccountPage;
