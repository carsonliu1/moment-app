import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#d76673',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#d76673',
      },
    }
  },
  appBarSearch: {
    borderRadius: '12px',
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    backgroundColor: '#FFF4F0',
    position: 'static'
  },
  pagination: {
    borderRadius: '10px',
    marginTop: '1rem',
    padding: '16px',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',

  },
  gridContainer: {
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'stretch',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchButton: {
    backgroundColor: '#D76673',
    color: 'white',
    borderRadius: '10px',
    fontWeight: 600,
  }
}));