import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#FFF4F0',
    borderRadius: '12px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#d76673',
    color: 'white',
    borderRadius: '10px',
    fontWeight: 600,
  },
  buttonClear: {
    marginBottom: 10,
    color: 'white',
    borderRadius: '10px',
    fontWeight: 600,
  },
}));