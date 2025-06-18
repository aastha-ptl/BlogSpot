import React, { use, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    videoLinks: ['', ''],
    image: null,
  })
 
 const navigate = useNavigate()
  const [previewImageUrl, setPreviewImageUrl] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVideoChange = (index, value) => {
    const updated = [...formData.videoLinks]
    updated[index] = value
    setFormData((prev) => ({ ...prev, videoLinks: updated }))
  }

  const handleTagsChange = (e) => {
    const value = e.target.value
    const updatedTags = e.target.checked
      ? [...formData.tags, value]
      : formData.tags.filter((tag) => tag !== value)
    setFormData((prev) => ({ ...prev, tags: updatedTags }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, image: file }))
      setPreviewImageUrl(URL.createObjectURL(file))
    } else {
      setFormData((prev) => ({ ...prev, image: null }))
      setPreviewImageUrl(null)
      setMessage(' Please select a valid image file.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData()
      form.append('title', formData.title.trim())
      form.append('description', formData.description.trim())
      form.append('tags', JSON.stringify(formData.tags))
      form.append('videoLinks', JSON.stringify(formData.videoLinks))
      if (formData.image) form.append('image', formData.image)

      const token = localStorage.getItem('token')
      await axios.post('https://blogspot-8l4s.onrender.com/api/blog', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Blog added successfully!')
      setFormData({
        title: '',
        description: '',
        tags: [],
        videoLinks: ['', ''],
        image: null,
      })
      setPreviewImageUrl(null)
      navigate('/user/my-blogs') 
    } catch (error) {
      console.error(error)
      setMessage('Error adding blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-13 p-6 bg-white rounded-xl shadow-md border border-blue-200">
      <h2 className="text-2xl font-bold mb-6 text-[#005A9C] text-center">Add New Blog</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Select Tags</label>
          <div className="grid grid-cols-2 gap-2">
            {['technical', 'management', 'coding', 'career', 'softskills'].map((tag) => (
              <label key={tag} className="inline-flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={handleTagsChange}
                  className="accent-blue-600  border-gray-300 "
                />
                <span className="capitalize">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Video Link 1 (optional)</label>
          <input
            type="text"
            value={formData.videoLinks[0]}
            onChange={(e) => handleVideoChange(0, e.target.value)}
            className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Video Link 2 (optional)</label>
          <input
            type="text"
            value={formData.videoLinks[1]}
            onChange={(e) => handleVideoChange(1, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Blog Image (optional)</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-700 border px-4 py-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
            {formData.image && (
              <span className="text-sm text-gray-500 truncate w-40">{formData.image.name}</span>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#005A9C] text-white px-6 py-2 rounded-lg transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {loading ? 'Submitting...' : 'Submit Blog'}
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-6 text-center font-medium text-green-600">{message}</p>
      )}

      {/* Preview Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📋 Blog Preview</h3>

        {previewImageUrl && (
          <img
            src={previewImageUrl}
            alt="Preview"
            className="mt-4 w-40 h-28 object-cover rounded shadow"
          />
        )}
        {formData.title && (
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-[#005A9C]">{formData.title}</h4>
            <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}


            {(formData.videoLinks[0] || formData.videoLinks[1]) && (
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                {formData.videoLinks.map((link, i) =>
                  link ? (
                    <div key={i}>
                      ▶️ Video Link {i + 1}:{' '}
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {link}
                      </a>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddBlog
