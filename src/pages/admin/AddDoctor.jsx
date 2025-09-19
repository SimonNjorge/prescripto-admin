import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <form>
      <p>Add Doctor</p>

      <div>

        <div>
          <label htmlFor="doc-img">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" name="" id="doc_img" hidden/>
          <p>upload doctor <br /> picture</p>
        </div>

        <div>
          <div>

            <div>
              <p>Doctor name</p>
              <input type="text" placeholder='Name'/>
            </div>

            <div>
              <p>Doctor Email</p>
              <input type="email" placeholder='Email'/>
            </div>

            <div>
              <p>Doctor password</p>
              <input type="password" placeholder='password'/>
            </div>

            <div>
              <p>Experience</p>
              <select name="" id="">
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

          </div>
        </div>

      </div>

    </form>
  )
}

export default AddDoctor