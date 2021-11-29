import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    width:320
  },

  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));