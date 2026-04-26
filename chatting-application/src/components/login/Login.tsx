import { useState } from "react"
import './login.css'
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { uploadToCloudinary } from "../../utils/cloudinary";

function Login() {

  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
      console.log(avatar)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", res.user);
      toast.success("Logged in successfully;");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      let imageUrl = "";

      if (avatar.file) {
        imageUrl = await uploadToCloudinary(avatar.file);
      }

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        avatar: imageUrl,
        blocked: []
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: []
      });

      toast.success("Account created successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator">
      </div>
      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="file">
            <img src={avatar.url || "../../../public/images/avatar.png"} alt="" />
            Upload an image</label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder="User name" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="text" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Login