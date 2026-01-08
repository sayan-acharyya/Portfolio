import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  clearAllForgotResetPassErrors,
  resetPassword,
} from '@/store/slices/forgotResetPasswordSlice'
import { getUser } from '@/store/slices/userSlice'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  )
  const { isAuthenticated } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllForgotResetPassErrors())
    }
    if (isAuthenticated) {
      navigateTo('/')
    }
    if (message) {
      toast.success(message)
      dispatch(getUser())
    }
  }, [dispatch, isAuthenticated, error, message])

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      {/* Left: Reset Form */}
      <div className="flex items-center justify-center px-6">
        <Card className="w-full max-w-md rounded-2xl shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Reset Password 🔐</h1>
              <p className="text-sm text-muted-foreground">
                Create a strong new password for your account
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {!loading ? (
                <Button className="w-full" onClick={handleResetPassword}>
                  Reset Password
                </Button>
              ) : (
                <SpecialLoadingButton content="Resetting password..." />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src=" https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
          alt="Reset Password Illustration"
          className="w-[75%] max-w-md"
        />
      </div>
    </div>
  )
}

export default ResetPassword;
