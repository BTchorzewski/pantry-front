export function LoginPage() {
  return (
    <form className='Form'>
      <label htmlFor='email' className='Form__label'>
        Email
        <input type='text' className='Form__input' id='email' />
      </label>
      <label htmlFor='password' className='Form__label'>
        Password:
        <input type='password' className='Form__input' id='password' />
      </label>
    </form>
  );
}
