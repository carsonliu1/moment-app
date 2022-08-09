import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#FFF4F0',
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'static',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingBottom: '20px',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
  },
  avatar: {
    color: 'white',
    backgroundColor: '#d76673'
  },
  buttons: {
    color: 'white',
    backgroundColor: '#D76673',
  },
  image: {
    marginLeft: '10px'
  }
}));