import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const AddDoctor = () => {

  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const [action, setAction] = useState(false);

  //const formRef = useRef();

  //const address = {address1, address2};
  //const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {backendUrl, adminAtoken} = useContext(AdminContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //formRef.current.reset();
    if (!action) {
      try {

        if(!docImage){
          return toast.error('Please upload an image')
        }

        setAction(true)
        /*
        await new Promise((resolve, reject) => {
          setTimeout(()=>{
          reject({message: 'failed'})
        }, 12000)}).catch(console.log)*/

        const formData = new FormData();
        formData.append('image', docImage);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('experience', experience);
        formData.append('fees', Number(fees));
        formData.append('about', about);
        formData.append('degree', degree);
        formData.append('speciality', speciality);
        formData.append('address', JSON.stringify({line1: address1, line2: address2}));
        /*
        formData.forEach((value, key)=>{
          console.log(formData.values) 
          //console.log(`${key} : ${value}`);
        });*/
        
        const { data } = await axios.post(backendUrl + '/api/admin/add-doctor',
          formData,
          {
            headers: {
              'authorization': `Bearer ${adminAtoken}`
            }
          }
        )
        if(data.success){
          toast.success(data.message)
          setDocImage(false)
          setName('')
          setEmail('')
          setPassword('')
          setDegree('')
          setFees('')
          setAbout('')
          setAddress1('')
          setAddress2('')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setAction(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full max-sm:mx-2">
      <p className="text-lg mb-3 font-medium">Add Doctor</p>

      <div className="bg-white py-8 px-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll max-sm:px-2">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc_img">
            <img
              className="w-16 bg-gray-400 rounded-full cursor-pointer"
              src={ docImage ? URL.createObjectURL(docImage) : assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e)=>setDocImage(e.target.files[0])} type="file" name="image" id="doc_img" hidden />
          <p>
            Upload Doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col items-start gap-10 text-gray-600 lg:flex-row">
          <div className="w-full lg:flex-1 flex flex-col gap-4  border border-gray-300 p-2">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border rounded py-2 px-3 border-gray-300"
                type="text"
                placeholder="Name"
                required
                onChange={(e)=>setName(e.target.value)} value={name}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border border-gray-300 rounded py-2 px-3"
                type="email"
                placeholder="Email"
                required
                onChange={(e)=>setEmail(e.target.value)} value={email}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor password</p>
              <input
                className="border border-gray-300 rounded py-2 px-3"
                type="password"
                placeholder="password"
                required
                onChange={(e)=>setPassword(e.target.value)} value={password}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select name="" id="" className="py-2 px-3"
                onChange={(e)=>setExperience(e.target.value)}
                value={experience}
              >
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 year">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="6 years">6 years</option>
                <option value="7 years">7 years</option>
                <option value="8 years">8 years</option>
                <option value="9 years">9 years</option>
                <option value="10 years">10 years</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border border-gray-300 rounded py-2 px-3"
                type="Number"
                placeholder="fees"
                required
                onChange={(e)=>setFees(e.target.value)} value={fees}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4  border border-gray-300 p-2">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select name="" id="" className="py-2 px-3"
                onChange={(e)=>setSpeciality(e.target.value)} value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynaecologist">Gynaecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Paediatrician">Paediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border border-gray-300 rounded py-2 px-3"
                type="text"
                placeholder="Education"
                required
                onChange={(e)=>setDegree(e.target.value)} value={degree}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border border-gray-300 rounded py-2 px-3"
                type="text"
                placeholder="address 1"
                required
                onChange={(e)=>setAddress1(e.target.value)} value={address1}
              />
              <input
                className="border border-gray-300 rounded py-2 px-3"
                type="text"
                placeholder="address 2"
                onChange={(e)=>setAddress2(e.target.value)} value={address2}
              />
            </div>
          </div>
        </div>

        <div className=" border border-gray-300 p-2 mt-2">
          <p className="my-2">Write doctor about</p>
          <textarea
            className="w-full border border-gray-300 rounded py-2 px-3"
            placeholder="Type here"
            rows={5}
            required
            onChange={(e)=>setAbout(e.target.value)} value={about}
          />
        </div>

        <button type="submit" className="bg-primary text-white px-6 py-2 mt-2 rounded-full cursor-pointer hover:bg-blue-400">
          {action
            ? <div className='flex items-center'>
                <p className='w-3 h-3 border animate-spin mr-1'></p>
                  adding...
              </div>
            : 'Add doctor'
          }
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
