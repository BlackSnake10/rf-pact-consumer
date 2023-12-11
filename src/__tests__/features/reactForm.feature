Feature: React form

  This app will show a Registry Form for the user to complete.
  The form is formed by, and referenced in this document as:

  - 1 "user" input field
  - 1 "name" input field
  - 1 "surname" input field
  - 1 "country" select component composed of the next values
  - "Spain"
  - "Japan"
  - 1 "user_id" (shown with an "ID" label) input field
  - 1 "submit" button which will send input data (henceforth referenced as "data") previously validated to the server
  - 1 "clear" button which will erase the "data" written by the user

  Each field will be allowed to the user to be written with romanized characters.


  Background:
    Given the user opens the app

  @done
  Scenario: Check form works
    Then the subtitle should show: "Please, enter your data:"

  @done
  Scenario Outline: Show validation error on input fields
    When the user writes "test" in the input "<inputField>"
    When the user clears the input "<inputField>"
    Then the "<inputField>" validation error should show: "This field is required"

    Examples:
      | inputField |
      | user       |
      | name       |
      | surname    |
      | user_id    |

  @done
  Scenario Outline: Do not show input text errors when load page
    Then the "<inputField>" validation error should not show

    Examples:
      | inputField |
      | user       |
      | name       |
      | surname    |
      | user_id    |

  @done
  Scenario Outline: Forced uppercase for all fields that can start with a letter
    When the user writes "test" in the input "<inputField>"
    Then the "<inputField>" input should show: "TEST"

    Examples:
      | inputField |
      | user       |
      | name       |
      | surname    |

  @done
  Scenario: Forced uppercase for all fields that can start with a number
    When the user writes "2test" in the input "user_id"
    Then the "user_id" input should show: "2TEST"

  @done
  Scenario Outline: Write in user input - Max 10 digits
    When the user writes "<writeText>" in the input "user"
    Then the "user" input should show: "<resultText>"

    Examples:
      | writeText    | resultText |
      | asdfghjklo   | ASDFGHJKLO |
      | asdfghjklo7  | ASDFGHJKLO |
      | asdfghjklop  | ASDFGHJKLO |
      | asdfghjklo " | ASDFGHJKLO |
      | asdfghjk5l   | ASDFGHJK5L |

  @done
  Scenario: Default value - "country" field
    Then the "country" select field should show: "SELECT COUNTRY"

  @done
  Scenario: Show error when "country" field not changed
    When the user clicks the "country" field
    Then the "country" validation error should show: "This field is required"

  @single
  Scenario Outline: Constraint error - "name" input can not be in the "user" input
    When the user writes "<userInput>" in the input "user"
    And the user writes "<nameInput>" in the input "name"
    Then the constraint error should show: "Username field must not contain Name field"

    Examples:
      | userInput | nameInput  |
      | hello     | hello      |
      | james     | james mark |
      | mark      | james mark |
      | abcde     | abc        |
      | deabc     | abc        |
      | dabce     | abc        |


  @single
  Scenario Outline: Constraint error - "user_id" should be valid
    When the user selects the <option> option in the "country" select field
    And the user writes "<userIdInput>" in the input "user_id"
    Then the constraint error should show: "<countryId> ID is not valid"

    Examples:
      | option | userIdInput  | countryId |
      | 1      | 12345678A    | SPAIN     |
      | 1      | NINEINPUT    | SPAIN     |
      | 2      | 123456789012 | JAPAN     |

  @done
  Scenario: Constraint error - Multiple constraint errors
    When the user selects the 1 option in the "country" select field
    And the user writes "1" in the input "user_id"
    And the user writes "james" in the input "user"
    And the user writes "james" in the input "name"
    Then one constraint error should be: "Username field must not contain Name field"
    And one constraint error should be: "SPAIN ID is not valid"

  @done
  Scenario: Constraint error - Add and remove constraint errors
    When the user selects the 1 option in the "country" select field
    And the user writes "1" in the input "user_id"
    And the user writes "james" in the input "user"
    And the user writes "james" in the input "name"
    Then one constraint error should be: "Username field must not contain Name field"
    And one constraint error should be: "SPAIN ID is not valid"
    Then the user writes "12345678Z" in the input "user_id"
    Then one constraint error should be: "Username field must not contain Name field"

  @done
  Scenario: Clear all inputs
    When the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678A" in the input "user_id"
    And the user clicks the "clear" button
    Then the "user" input should be empty
    And the "name" input should be empty
    And the "surname" input should be empty
    And the "country" select field should show: "SELECT COUNTRY"
    And the "user_id" input should be empty

  @done
  Scenario: Disable submit button - App loads
    Then the "submit" button should be disabled

  @done
  Scenario: Enable submit button - Form does not have an error
    When the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678Z" in the input "user_id"
    Then the "submit" button should be enabled

  @done
  Scenario: Disable submit button - Form has name in user error
    When the user writes "MyUser" in the input "user"
    And the user writes "user" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678A" in the input "user_id"
    Then the "submit" button should be disabled

  @done
  Scenario: Disable submit button - Form has user_id error
    When the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678A" in the input "user_id"
    Then the "submit" button should be disabled

  @done
  Scenario: Validation Order - Starting with Name
    When the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678Z" in the input "user_id"
    And the user writes "MyUser" in the input "user"
    Then the "submit" button should be enabled

  @done
  Scenario: Validation Order - Starting with Surname
    When the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678Z" in the input "user_id"
    And the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    Then the "submit" button should be enabled

  @done
  Scenario: Validation Order - Starting with Country
    When the user selects the 1 option in the "country" select field
    And the user writes "12345678Z" in the input "user_id"
    And the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    Then the "submit" button should be enabled

  @done
  Scenario: Validation Order - Starting with ID
    When the user writes "12345678Z" in the input "user_id"
    And the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    Then the "submit" button should be enabled

  @done
  Scenario: Click all inputs
    When the user clicks the "user" field
    And the user clicks the "name" field
    And the user clicks the "surname" field
    And the user clicks the "country" field
    And the user clicks the "user_id" field
    Then the "submit" button should be disabled

  @done
  Scenario: Click all inputs while having a constraint error
    When the user writes "MyUser" in the input "user"
    And the user writes "User" in the input "name"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678A" in the input "user_id"
    And the user clicks the "user" field
    And the user clicks the "name" field
    And the user clicks the "surname" field
    And the user clicks the "country" field
    And the user clicks the "user_id" field
    Then the "submit" button should be disabled

  @done
  Scenario: Click clear shouldn't auto-enable the submit button
    When the user clicks the "clear" button
    Then the "submit" button should be disabled

  @single
  Scenario: Submitted data
    When the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678Z" in the input "user_id"
    And the user clicks the "submit" button
    Then the subtitle should show: "You will register to MinesweepeReact with this data. Is this correct?"
    And the "user" submitted field should show: "MYUSER"
    And the "name" submitted field should show: "NAME"
    And the "surname" submitted field should show: "MY SURNAME"
    And the "country" submitted field should show: "Spain"
    And the "user_id" submitted field should show: "12345678Z"

  @done
  Scenario: Submitted data - Restart form
    When the user writes "MyUser" in the input "user"
    And the user writes "Name" in the input "name"
    And the user writes "My Surname" in the input "surname"
    And the user selects the 1 option in the "country" select field
    And the user writes "12345678Z" in the input "user_id"
    And the user clicks the "submit" button
    And the user clicks the "formRestart" button
    Then the subtitle should show: "Please, enter your data:"
    And the "user" field should show: ""
    And the "name" field should show: ""
    And the "surname" field should show: ""
    And the "country" select field should show: "SELECT COUNTRY"
    And the "user_id" field should show: ""


# @done
# Scenario: Submit form - Show user data
#   When the user writes "MyUser" in the input "user"
#   And the user writes "Name" in the input "name"
#   And the user writes "My Surname" in the input "surname"
#   And the user selects the 1 option in the "country" select field
#   And the user writes "12345678A" in the input "user_id"
#   And the user clicks the "submit" button
#   Then the title should show: "Hello, MyUser, this is the information that we obtained from this form:"
#   And the "userInfo" text should show: "MyUser"
#   And the "nameInfo" text should show: "NAME"
#   And the "surnameInfo" text should show: "MY SURNAME"
#   And the "countryInfo" text should show: "SPAIN"
#   And the "user_idInfo" text should show: "12345678A"