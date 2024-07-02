import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    birthDate: vine.date(),
    email: vine.string().email().trim().escape(),
  })
)

/**
 * Validates the user's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    birthDate: vine.date(),
    email: vine.string().email().trim().escape(),

    // Validate route params
    params: vine.object({
      id: vine.number(),
    }),
  })
)

/**
 * Validates the user's update action
 */
export const deleteUserValidator = vine.compile(
  vine.object({
    // Validate route params
    params: vine.object({
      id: vine.number(),
    }),
  })
)
