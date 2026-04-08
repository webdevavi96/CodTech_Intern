const today = new Date();

const yesterdayDate = new Date();
yesterdayDate.setDate(today.getDate() - 1);

const lastWeekDate = new Date();
lastWeekDate.setDate(today.getDate() - 7);

const formatDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const users = [
  {
    id: 1,
    name: 'Jerry',
    username: 'jerry10003f',
    email: 'nothing.jerry',
    message: 'Hey there!',
    status: 'Online',
    variant: 'default',
    avatar: 'https://i.pravatar.cc/101',
    last_message: formatDate(today),
    timeStamp: '2:33 PM',
    bio: ` Our goal is to provide a fast, secure, and real-time communication platform that
    connects people seamlessly. We aim to deliver a modern chatting experience with powerful
    features while maintaining simplicity and reliability.`,
  },
  {
    id: 2,
    name: 'Harry',
    message: 'Hey, How are you?',
    status: 'Yesterday',
    variant: 'active',
    avatar: 'https://i.pravatar.cc/102',
    last_message: formatDate(yesterdayDate),
    timeStamp: '2:33 PM',
  },
  {
    id: 3,
    name: 'Joe',
    message: "Let's go.",
    status: '2 Days Ago',
    variant: 'muted',
    avatar: 'https://i.pravatar.cc/103',
    last_message: formatDate(lastWeekDate),
    timeStamp: '2:33 PM',
  },
];
