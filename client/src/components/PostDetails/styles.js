import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '800px',
    maxHeight: '800px',
    marginBottom: '50px',
    [theme.breakpoints.down('md')]: {
      marginTop: '30px',
      width: '100%',
      height: '100%'
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  imageSection: {
    marginTop: '20px',
    marginLeft: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex', justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px', overflowY: 'auto', marginRight: '30px'
  },
  title: {
    marginLeft: '-2px',
    marginBottom:'15px',
    paddingBottom: '12px'
  },
  tags: {
    paddingBottom: '5px',
    margin:'15px 0',
  },
  message: {
    paddingBottom: '13px',
    margin:'15px 0',
  },
  relatedCard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    height: 'max-content',
    width: 'max-content',
    position: 'relative',
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      width: 'auto'
    },
  },
  body: {
    height: '250px',
    width: '310px',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      width: 'auto'
    },
  },
  relatedTitle: {
    margin: '10px 14px',
    paddingTop: '10px',
    width: 'max-content',
    cursor: 'pointer',
    fontSize: '20px'
  },
  commentForm: {
    width: '60%',
    marginTop: '90px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    cursor: 'pointer'
  },
  commentButton: {
    margin: '20px 0',
    backgroundColor:'#d76673',
    color: 'white',
    borderRadius:'11px',
    width: '60%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  }
}));