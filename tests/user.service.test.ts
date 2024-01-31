import {findUserByEmail, findUserById} from "../src/core/service/user.service";
import {UserEntity} from "../src/data/entity/user.entity";
import UserNotExistsException from "../src/core/exception/user.not.exists.exception";

jest.mock("../src/data/entity/user.entity", () => ({
    UserEntity: {
        findOne: jest.fn(),
        findById: jest.fn()
    }
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe("User Service Tests for findOne() method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return user when found by existed email", async () => {
        const mockUser = {
            id: "65b800a575063c385a383315", name: "Boris", email: "boris_johnson@com.uk",
            password: "$2b$10$BWyG7tlkO9fFBnyaTBFKyeGyELY0vsSCbl7H1jNRNa0qZoWQ/FQ3S", role: "admin"
        };

        (UserEntity.findOne as jest.Mock).mockReturnValue(mockUser);

        const result = await findUserByEmail("boris_johnson@com.uk");

        expect(result).toEqual(mockUser);
        expect(UserEntity.findOne).toHaveBeenCalledWith({email: "boris_johnson@com.uk"});
    });

    it("should return null when found by no existed email", async () => {
        (UserEntity.findOne as jest.Mock).mockResolvedValue(null);

        const result = await findUserByEmail("test@example.com");

        expect(result).toBeNull();
        expect(UserEntity.findOne).lastCalledWith({email: "test@example.com"});
    });

    it("should return null when found by empty email", async () => {
        (UserEntity.findOne as jest.Mock).mockResolvedValue(null);

        const result = await findUserByEmail("");

        expect(result).toBeNull();
        expect(UserEntity.findOne).lastCalledWith({email: ""});
    });

    it("should return null when found by null email", async () => {
        (UserEntity.findOne as jest.Mock).mockResolvedValue(null);

        const result = await findUserByEmail(String.apply(null));

        expect(result).toBeNull();
        expect(UserEntity.findOne).toHaveBeenLastCalledWith({email: String.apply(null)});
    });

    it("should throw UserNotExistsException when user is not found by email", async () => {
        (UserEntity.findOne as jest.Mock).mockRejectedValue("test@example.com");

        await expect(findUserByEmail("test@example.com")).rejects.toThrowError(
            UserNotExistsException
        );

        expect(UserEntity.findOne).toHaveBeenCalledWith({email: "test@example.com"});
    });
});

describe("User Service Tests for findById() method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return user when found by existed id", async () => {
        const mockUser = {
            id: "65b800a575063c385a383315", name: "Boris", email: "boris_johnson@com.uk",
            password: "$2b$10$BWyG7tlkO9fFBnyaTBFKyeGyELY0vsSCbl7H1jNRNa0qZoWQ/FQ3S", role: "admin"
        };

        (UserEntity.findById as jest.Mock).mockReturnValue(mockUser);

        const result = await findUserById("65b800a575063c385a383315");

        expect(result).toEqual(mockUser);
        expect(UserEntity.findById).toHaveBeenCalledWith("65b800a575063c385a383315");
    });

    it("should return null when found by no existed id", async () => {
        (UserEntity.findById as jest.Mock).mockResolvedValue(null);

        const result = await findUserById("65b8001bdace98f888f5a019");

        expect(result).toBeNull();
        expect(UserEntity.findById).lastCalledWith("65b8001bdace98f888f5a019");
    });

    it("should return null when found by empty id", async () => {

        (UserEntity.findById as jest.Mock).mockResolvedValue(null);

        const result = await findUserById("");

        expect(result).toBeNull();
        expect(UserEntity.findById).lastCalledWith( "");
    });

    it("should return null when found by null id", async () => {

        (UserEntity.findById as jest.Mock).mockResolvedValue(null);

        const result = await findUserById(String.apply(null));

        expect(result).toBeNull();
        expect(UserEntity.findById).toHaveBeenLastCalledWith(String.apply(null));
    });

    it("should throw UserNotExistsException when user is not found by id", async () => {
        (UserEntity.findById as jest.Mock).mockRejectedValue("65b8001bdace98f888f5a019");

        await expect(findUserById("65b8001bdace98f888f5a019")).rejects.toThrowError(
            UserNotExistsException
        );

        expect(UserEntity.findById).toHaveBeenCalledWith("65b8001bdace98f888f5a019");
    });
});