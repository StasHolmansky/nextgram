import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Upload() {
  const supabase = useSupabaseClient()
  const [uploading, setUploading] = useState(false)

  const uploadAvatar = async (event: { target: { files: string | any[] } }) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError, data } = await supabase.storage
        .from('photos')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      const publicURL = supabase.storage.from("photos").getPublicUrl(filePath);
      const { data: { user } } = await supabase.auth.getUser()

      console.log({data: { user }});
      await supabase
        .from('photos')
        .insert({ id: 1, url: publicURL })

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
          disabled={uploading}
        />
      </div>
    </div>
  )
}