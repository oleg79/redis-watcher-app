/** @flow */
const { Notification } = window

type NotificationParams = {
  title: string,
  icon: string,
  body: string,
  tag:? string
}

const makeNotification = ({ title, ...rest }: NotificationParams) =>
  new Notification(title, { ...rest })

export default makeNotification
