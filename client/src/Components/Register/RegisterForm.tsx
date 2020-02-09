  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={firstName}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={lastName}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="email"
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={phone}
          required
        />
        <input
          type="text"
          name="bvn"
          placeholder="BVN"
          onChange={handleChange}
          value={bvn}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={confirmPassword}
          required
        />
        <input
          type="password"
          name="pin"
          placeholder="4 -Digit PIN"
          maxLength={4}
          pattern="[0-9]{4}"
          onChange={handleChange}
          value={pin}
          required
        />
        <input
          type="password"
          name="confirmPin"
          placeholder="Confirm 4 -Digit PIN"
          maxLength={4}
          pattern="[0-9]{4}"
          onChange={handleChange}
          value={confirmPin}
          required
        />
        <input type="submit" value="Register" className="reg-btn" />
      </form>
      <div className="info">
        Already a member?{' '}
        <Link className="login" to="/">
          Login
        </Link>
      </div>
    </>
  );
};
