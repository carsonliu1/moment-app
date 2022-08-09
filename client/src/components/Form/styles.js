import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& label.Mui-focused': {
      color: '#d76673',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#d76673',
      },
    }
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#FFF4F0',
    borderRadius: '12px',
    fontSize: '17px',
    color: 'gray',
    fontWeight: '100',
    fontFamily: 'Times New Roman',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));