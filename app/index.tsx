import {Redirect} from 'expo-router';

/** Declarative redirect — avoids router.replace() before the root Stack is ready. */
export default function Index() {
  return <Redirect href="/(tabs)/foryou" />;
}
