import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    cursor: 'pointer'
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '20px',
    height: '100%',
    position: 'relative',
    animation: `$fade-in 0.5s ease-in`,
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  title: {
    margin: '10px 14px',
    paddingTop: '10px',
    width: '90%',
    cursor: 'pointer',
    fontSize: '26px'
  },
  cardActions: {
    padding: '0 16px 8px 10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 16px'
  },
  body: {
    minHeight: '200px',
  },
  "@keyframes fade-in": {
    "0%": {
      opacity: 0,
      transform: 'translateY(-10%)',
    },
    "50%": {
      opacity: 0.4,
    },
    "100%": {
      opacity: 1,
      transform: 'translateY(0%)',
    }
  },
  "@keyframes rotate": {
    "0%": {
      transform: 'rotate(0deg)'
    },
    "100%": {
      transform: 'rotate(360deg)'
    },
  },
});