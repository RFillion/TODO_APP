import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Sheet from 'react-modal-sheet'
import Button from '../components/button';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isShown, setIsShown] = useState(false);

  const ref = useRef();
  const snapTo = (i) => ref.current?.snapTo(i);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="container px-4 pt-4">
      Hello {user.displayName}
      <Button onClick={logout}>Log out</Button> <br />

      <Button onClick={() => setIsShown(true)}>Open sheet</Button>

      <Sheet
        //rootId="root"
        ref={ref} 
        isOpen={isShown} 
        onClose={() => setIsShown(false)}
        snapPoints={[785]}
        initialSnap={0}>
        <Sheet.Container style={{background: '#0c111b'}}>
          <Sheet.Header />
          <Sheet.Content>
            <div className="mx-4 text-white">Voici une Sheet</div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </section>
  );
}
