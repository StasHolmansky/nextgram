import React, { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase';

export default function Upload() {
  const [uploading, setUploading] = useState(false)

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }
         
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      let { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }
      
      const publicURL = supabase.storage.from("photos").getPublicUrl(filePath).data.publicUrl;
      // const publicURL = 'https://pbs.twimg.com/media/E8txb2yVkAQxRVw?format=jpg';
      const userID = (await supabase.auth.getUser()!).data.user.id;
      // const publicURL = supabase.from("photos").select();
      await supabase.from("photos").insert({
        user_id: userID,
        url: publicURL
      })            
      console.log((await supabase.auth.getUser()!));
      console.log(publicURL);
      
      
    } catch (error) {
      console.log(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div style={{ width: 300 }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <div><a href='/'>Home</a></div>
      </div>
    </div>
  )
}