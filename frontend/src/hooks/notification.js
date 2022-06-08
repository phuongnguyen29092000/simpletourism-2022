import { Store } from 'react-notifications-component'
import "react-notifications-component/dist/theme.css";
import "animate.css";

const notification = {
  insert: 'top',
  container: 'bottom-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
}

const Success = ({
  title,
  message,
  container = 'bottom-right',
  duration = 5000,
}) => {
  Store.addNotification({
    title: title,
    message: message,
    type: "success",
    insert: "top",
    container: container,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true
    }
  });
}

const Error = ({
  title,
  message,
  container = 'bottom-right',
  duration = 5000,
}) => {
  Store.addNotification({
    title: title,
    message: message,
    type: "danger",
    insert: "top",
    container: container,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      onScreen: true
    }
  });
}

const Info = ({
  title,
  message,
  container = 'bottom-right',
  duration = 5000,
}) => {
  // Store.addNotification({
  //   ...notification,
  //   title: title,
  //   message: message,
  //   type: 'info',
  //   container,
  //   dismiss: {
  //     duration,
  //     onScreen: true,
  //   },
  // })
}

const Warning = ({
  title,
  message,
  container = 'bottom-right',
  duration = 5000,
}) => {
  // Store.addNotification({
  //   ...notification,
  //   title: title,
  //   message: message,
  //   type: 'warning',
  //   container,
  //   dismiss: {
  //     duration,
  //     onScreen: true,
  //   },
  // })
}

const Default = ({
  title,
  message,
  container = 'bottom-right',
  duration = 5000,
}) => {
  // Store.addNotification({
  //   ...notification,
  //   title: title,
  //   message: message,
  //   type: 'default',
  //   container,
  //   dismiss: {
  //     duration,
  //     onScreen: true,
  //   },
  // })
}

const useNotification = {
  Success,
  Error,
  Info,
  Warning,
  Default,
}

export default useNotification
